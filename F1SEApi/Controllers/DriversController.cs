using Microsoft.AspNetCore.Mvc;
using F1SEApi.Models;
using Microsoft.EntityFrameworkCore;
using F1SEApi.Contexts;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Threading.Tasks;

// CRUD - Create Read Update Delete 
namespace F1SEApi.Controllers;


[Route("api/[controller]")] // url path vil være https://localhost:5086/api/Drivers
[ApiController]
public class DriversController : ControllerBase
{

    private readonly F1SEContext f1SEContext;
    private readonly IWebHostEnvironment _hostingEnvironment;

    public DriversController(F1SEContext _f1SEContext, IWebHostEnvironment hostEnvironment) // Dependency Injection (DI) - F1SEContext er en dependency til DriversController
    {
        f1SEContext = _f1SEContext;
        _hostingEnvironment = hostEnvironment;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Driver>>> GetDrivers([FromQuery] string? searchQuery = null)
    {
        try {
            var driversQuery =  f1SEContext.Drivers.AsQueryable();

            if (!string.IsNullOrEmpty (searchQuery)) 
            {
                if (int.TryParse(searchQuery , out int id)) 
                {
                    driversQuery = driversQuery.Where(d => d.Id == id);
                }
                else 
                {
                    searchQuery = searchQuery.ToLower();
                    driversQuery = driversQuery.Where(d => 
                    (!string.IsNullOrEmpty(d.Name) && d.Name.ToLower().Contains(searchQuery)));
                }
            }
            var drivers = await driversQuery.ToListAsync();
            if (drivers.Any())
            {
                return Ok(drivers);
            }
            else
            {
                return NotFound("Ingen drivere funnet");
            }
        }
        catch {
            return StatusCode(500, "Noe er galt med intern server"); 
        }
    }

    [HttpGet("{id}")] 
    public async Task<ActionResult<Driver>> GetDriver(int id) 
    {
        try {
            Driver? drivers = await f1SEContext.Drivers.FindAsync(id); 
            if (drivers != null) {
                return Ok(drivers);
            } else {
                return NotFound ("Driver med ID " + id + " ble ikke funnet");
            }
        }
        catch {
            return StatusCode(500, "Noe er galt med intern server"); 
        }
    }

    [HttpGet] 
    [Route("[action]")] // // For å kunne legge til Get-metoder utover standard-Get (for å hente alle av noe) og Get etter id må en bruke Route (fra og med Get-metode nummer 3 altså denne utfører andre Get ).

    public string GetName()
    {
        return "Hello World!";
    }

// POST - api/drivers 
    [HttpPost] 
    public async Task<IActionResult> CreateDriver([FromForm]CreateDriverModel model)
    {
        if (model == null)
        {
            return BadRequest("Invalid driver data");
        }
    
        try {
            var driverImagePath = model.DriverImage != null ? await SaveImage(model.DriverImage, "images/drivers") : null;
            var flagImagePath = model.FlagImage != null ? await SaveImage(model.FlagImage, "images/flags") : null;
            var carImagePath = model.CarImage != null ? await SaveImage(model.CarImage, "images/cars") : null;

            var newDriver = new Driver
            {
                Name = model.Name,
                Age = model.Age,
                Nationality = model.Nationality,
                Manufacturer = model.Manufacturer,
                Image = driverImagePath,
                FlagImage = flagImagePath,
                CarImage = carImagePath
            };

            f1SEContext.Drivers.Add(newDriver);
            await f1SEContext.SaveChangesAsync();
            return Ok(newDriver);
        }
        catch (Exception ex) {
            return StatusCode(500, "Feil under oppretting av ny driver" + ex.Message);
        }
        }


        // metode for å lagre bilder
        private async Task<string?> SaveImage(IFormFile file, string folderName)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }
        
        string uploadsFolderPath = Path.Combine(_hostingEnvironment.WebRootPath, folderName);
        if (!Directory.Exists(uploadsFolderPath))
        {
            Directory.CreateDirectory(uploadsFolderPath);
        }

        string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
        string filePath = Path.Combine(uploadsFolderPath, uniqueFileName);
        

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return uniqueFileName; 
        }
        


// PUT - api/drivers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDriver(int id, Driver driver)
        {
            if (id != driver.Id)
            {
                return BadRequest();

            }

            f1SEContext.Entry(driver).State = EntityState.Modified;

            try 
            {
                await f1SEContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!f1SEContext.Drivers.Any(x => x.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();

        }

        // Delete - api/drivers/5 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDriver(int id)
        {
            var transaction = f1SEContext.Database.BeginTransaction();
            try {
            var driver = await f1SEContext.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }
            f1SEContext.Drivers.Remove(driver);
            await f1SEContext.SaveChangesAsync();

            transaction.Commit();

            return NoContent();
        }
        catch (Exception ex) {
            return StatusCode(500, "Noe er galt med intern server" + ex.Message);
        }




}
}
