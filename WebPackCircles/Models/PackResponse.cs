namespace WebPackCircles.Models;

public class PackResponse
{
    public List<Circle> RectangularCircles { get; set; }
    public PackResult RectangularResult { get; set; }
    public List<Circle> TriangularCircles { get; set; }
    public PackResult TriangularResult { get; set; }
}