using Microsoft.AspNetCore.Mvc;
using F1SEApi.Contexts;
using F1SEApi.Models;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;

namespace F1SEApi.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ResultController : ControllerBase
{
    private readonly F1SEContext _f1SEContext;

    public ResultController(F1SEContext f1SEContext)
    {
        _f1SEContext = f1SEContext;
    }

    [HttpGet] // https://localhost:5086/api/result
    public async Task<ActionResult<IEnumerable<RaceResult>>>GetResult()
    {
        try 
        {
            var raceResult = await _f1SEContext.RaceResults.ToListAsync();
            if (raceResult.Any())
            {
                return Ok(raceResult);
            }
            else
            {
                return NotFound("Ingen resultater funnet");
            }
    }
    catch 
    {
        return StatusCode(500, "Noe er galt med intern server");
    }
}

[HttpGet("{id}")] // https://localhost:5086/api/result/
public async Task<ActionResult<RaceResult>> GetResult(int id)
{
    try {
        var result = await _f1SEContext.RaceResults.FindAsync(id);
        if (result != null)
        {
            return Ok(result);
        }
        else
        {
            return NotFound("Resultat med ID" + id + "ble ikke funnet");
        }
    }
    catch {
        return StatusCode(500, "Noe er galt med intern server");
    }
}





    [HttpPost("race")]
    public ActionResult RaceDrivers(int driverId1)

    {
        // fetch drivers from database
        var random = new Random();
        var drivers = _f1SEContext.Drivers.ToList();
        var driver2 = drivers[random.Next(drivers.Count)];

        while (driver2.Id == driverId1)
        {
            driver2 = drivers[random.Next(drivers.Count)];
        }
        var winner = random.Next(2) == 0 ? driverId1 : driver2.Id;

        // lagre resultatet i databasen
        var raceResult = new RaceResult {DriverId1 = driverId1, DriverId2 = driver2.Id, WinnerId = winner};
        _f1SEContext.RaceResults.Add(raceResult);
        _f1SEContext.SaveChanges();

        // oppdater vinnerens vinn count
    

        return Ok(_f1SEContext.Drivers.Find(winner));
        
    }


}



