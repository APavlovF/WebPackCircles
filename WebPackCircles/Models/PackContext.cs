namespace WebPackCircles.Models;

public class PackContext : SetupData
{
    public double EffectiveH { get; set; }
    public double EffectiveW { get; set; }
    public double Pitch { get; set; }

    public PackContext(double effectiveW, double effectiveH, double pitch, double margin, double d)
    {
        CircleSize = d;
        EffectiveH = effectiveH;
        EffectiveW = effectiveW;
        SheetMargin = margin;
        Pitch = pitch;
    }
}