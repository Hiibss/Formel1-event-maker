namespace F1SEApi.Interfaces; // export for the interface

// Interface for the driver class public, private, protected
public interface IDriver {

    public int Id { get; set; } // public property of tilgangsmetode

    public string? Name { get; set; }

    public int Age { get; set; }

    public string? Nationality { get; set;}

    public string? Image { get; set; }

    public bool IsProfessional { get; set; } 

    public string? FlagImage { get; set; }

    public string? Manufacturer { get; set; }

    public string? CarImage { get; set; }

    public string? WinnerName { get; set; }

    public int WinCount { get; set; }

    

}
