namespace F1SEApi.Models;

using F1SEApi.Interfaces;

// Driver class
public class Driver : IDriver 
{

    public int Id { get; set; }

    public string? Name  { get; set; } = "Not set";

    public int Age { get; set; }
    
    public string? Nationality { get; set; } = "Not set";

    public string? Image { get; set; } 

    public bool IsProfessional { get; set; } 

    public string? FlagImage { get; set; } = "Not set";

    public string? Manufacturer { get; set; } = "Not set";

    public string? CarImage { get; set; } = "Not set";

    public string? WinnerName { get; set; } = "Not set";

    public int WinCount { get; set; } 

    public List<RaceResult> RaceWins { get; set; } = new List<RaceResult>();
    public List<RaceResult> RaceResultsAsDriver1 { get; set; } = new List<RaceResult>();
    public List<RaceResult> RaceResultsAsDriver2 { get; set; } = new List<RaceResult>();
    
}

