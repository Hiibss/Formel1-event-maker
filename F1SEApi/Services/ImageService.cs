using Microsoft.AspNetCore.Identity;

namespace F1SEApi.Services;
public class ImageService
{
    private readonly IWebHostEnvironment _environment;
    private readonly string _imageFolder = "images";

    public ImageService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<string> SaveImage(IFormFile imageFile, string subFolder)
    { 
        string folderPath = Path.Combine(_environment.WebRootPath, _imageFolder, subFolder);

        try 
        {
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            string uniqueFileName = GetUniqueFileName(imageFile.FileName, folderPath);
            string fileNameWithPath = Path.Combine(folderPath, uniqueFileName);

            using (var fileStream = new FileStream(fileNameWithPath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            } 
            return uniqueFileName;
        } 
        catch (Exception ex) 
        {
            throw new Exception($"Could not create folder: {ex.Message}");
        }
    }


private static string GetUniqueFileName(string fileName, string folderPath)
    {
        string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);
        string extension = Path.GetExtension(fileName);
        int fileNameCounter = 1;

        string newFileName = fileName;

        while (File.Exists(Path.Combine(folderPath, newFileName))) 
        {
            string tempFileName = $"{fileNameWithoutExtension} ({fileNameCounter++})";
            newFileName = $"{tempFileName}{extension}";
        }

        return newFileName;


    }
}

