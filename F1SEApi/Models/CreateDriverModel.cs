namespace F1SEApi.Models
{

public class CreateDriverModel 
{
    public string? Name { get; set; }
    public string? Nationality { get; set; }
    public string? Manufacturer { get; set; }
    public int Age { get; set; }
    public IFormFile? DriverImage { get; set; }
    public IFormFile? FlagImage { get; set; }
    public IFormFile? CarImage { get; set; }
}

}