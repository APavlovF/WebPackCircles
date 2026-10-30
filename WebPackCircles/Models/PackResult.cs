namespace WebPackCircles.Models;

public class PackResult
{
    public double FillPercentage { get; set; }
    public bool IsBestCut { get; set; }
    public int LastSheetCircles { get; set; }
    public int QuantityPerSheet { get; set; }
    public int SheetsNeeded { get; set; }
}