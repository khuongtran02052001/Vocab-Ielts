import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/supabaseService';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { FileText, Info } from 'lucide-react';
import { toast } from 'sonner';

const ExcelUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Lấy danh sách categories
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Xử lý khi chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
        toast.error('Chỉ hỗ trợ file Excel (.xlsx, .xls)');
        return;
      }
      setFile(selectedFile);
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Vui lòng chọn file Excel để tải lên');
      return;
    }
    
    if (!selectedCategory) {
      toast.error('Vui lòng chọn danh mục');
      return;
    }

    setUploading(true);
    
    try {
      // Tạo FormData để gửi file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('categoryId', selectedCategory);
      
      // Gửi file đến Edge Function
      const { data, error } = await supabase.functions.invoke('excel-upload', {
        body: formData,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success(data.message || 'Tải lên thành công');
      // Chuyển hướng về trang chính
      navigate('/');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Có lỗi xảy ra khi tải lên file');
    } finally {
      setUploading(false);
    }
  };

  // Xử lý tải xuống file mẫu
  const handleDownloadTemplate = () => {
    // URL của file mẫu
    const templateUrl = '/template/vocabulary_template.xlsx';
    
    // Tạo link tải xuống
    const link = document.createElement('a');
    link.href = templateUrl;
    link.download = 'vocabulary_template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSearchChange={() => {}} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-heading font-bold mb-6">Tải lên từ vựng từ file Excel</h1>
          
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h2 className="text-lg font-medium mb-2 flex items-center">
              <Info className="mr-2 text-blue-600" size={20} />
              Hướng dẫn
            </h2>
            
            <div className="mb-4">
              <p className="mb-2">File Excel cần có các cột sau:</p>
              <ul className="list-disc list-inside mb-4 ml-4">
                <li><strong>term</strong> - Từ vựng (bắt buộc)</li>
                <li><strong>pronunciation</strong> - Phiên âm (tùy chọn)</li>
                <li><strong>part_of_speech</strong> - Loại từ (bắt buộc)</li>
                <li><strong>meaning</strong> - Ý nghĩa (bắt buộc)</li>
                <li><strong>usage</strong> - Cách dùng (tùy chọn)</li>
              </ul>
            </div>
            
            <div className="mb-4 bg-yellow-50 p-3 border-l-4 border-yellow-400">
              <p className="text-yellow-800">
                <strong>Lưu ý về chức năng phát âm:</strong> Sau khi tải lên thành công, phát âm sẽ được tự động
                thực hiện thông qua Text-to-Speech khi người dùng nhấp vào biểu tượng loa bên cạnh từ vựng.
                Không cần phải đính kèm file âm thanh trong file Excel.
              </p>
            </div>
            
            <Button 
              onClick={handleDownloadTemplate} 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <FileText size={18} />
              Tải xuống file mẫu
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Danh mục
              </label>
              <select
                id="category"
                className="w-full p-2 border rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
                disabled={isLoading || uploading}
              >
                <option value="">-- Chọn danh mục --</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {error && (
                <p className="text-red-500 text-sm mt-1">
                  Không thể tải danh sách danh mục
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="file" className="block text-sm font-medium mb-1">
                File Excel
              </label>
              <input
                type="file"
                id="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
                required
                disabled={uploading}
              />
              {file && (
                <p className="text-sm text-gray-600 mt-1">
                  Đã chọn: {file.name}
                </p>
              )}
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/')}
                disabled={uploading}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={!file || !selectedCategory || uploading}
              >
                {uploading ? 'Đang tải lên...' : 'Tải lên'}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2025 English Vocabulary Table - Your IELTS Learning Assistant</p>
        </div>
      </footer>
    </div>
  );
};

export default ExcelUpload;
