
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as XLSX from "https://esm.sh/xlsx@0.18.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const categoryId = formData.get("categoryId") as string;

    if (!file || !categoryId) {
      return new Response(
        JSON.stringify({ error: "File and category ID are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Khởi tạo Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Đọc file Excel
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Kiểm tra cấu trúc dữ liệu
    const requiredColumns = ["term", "part_of_speech", "meaning"];
    const firstRow = jsonData[0] as Record<string, unknown>;
    
    // Kiểm tra các cột bắt buộc
    for (const col of requiredColumns) {
      if (!(col in firstRow)) {
        return new Response(
          JSON.stringify({ error: `Missing required column: ${col}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Chuyển đổi dữ liệu và thêm vào cơ sở dữ liệu
    const wordsToInsert = jsonData.map((row: Record<string, unknown>) => ({
      term: row.term,
      pronunciation: row.pronunciation || null,
      part_of_speech: row.part_of_speech,
      meaning: row.meaning,
      usage: row.usage || null,
      category_id: categoryId
    }));

    // Thêm dữ liệu vào bảng words
    const { data, error } = await supabase
      .from("words")
      .insert(wordsToInsert)
      .select();

    if (error) {
      throw new Error(`Failed to insert data: ${error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully inserted ${data.length} words`,
        data
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing Excel file:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
