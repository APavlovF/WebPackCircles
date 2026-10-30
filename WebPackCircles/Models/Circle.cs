namespace WebPackCircles.Models;

public class Circle(double d, double x, double y)
{
    public double Diameter { get; set; } = d;
    public bool IsFilled { get; set; }
    public double X { get; set; } = Math.Round(x + d / 2, 4);
    public double Y { get; set; } = Math.Round(y + d / 2, 4);
}