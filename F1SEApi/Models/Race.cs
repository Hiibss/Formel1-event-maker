namespace F1SEApi.Models;

using F1SEApi.Interfaces;   

public class RaceResult : IRace
{
    public int Id { get; set; }
    public int DriverId1 { get; set; }
    public Driver? Driver1 { get; set; }

    public int DriverId2 { get; set;}
    public Driver? Driver2 { get; set; }


    public int WinnerId { get; set; }
    public Driver? Winner { get; set; }
}
