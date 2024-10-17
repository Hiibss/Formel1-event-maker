using F1SEApi.Models;
namespace F1SEApi.Interfaces; 

public interface IRace
{
    public int DriverId1 { get; set; }
    public int DriverId2 { get; set; }
    public int WinnerId { get; set; }
    public Driver? Driver1 { get; set; }
    public Driver? Driver2 { get; set; }

}