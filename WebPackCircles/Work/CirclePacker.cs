using WebPackCircles.Models;

namespace WebPackCircles.Work;

public abstract class CirclePacker
{
    public const double Eps = 1e-9;

    public List<Circle> Pack(double w, double h, double d, double gap, double margin)
    {
        List<Circle> result = [];

        double effectiveW = w - 2 * margin;
        double effectiveH = h - 2 * margin;

        if (d <= 0 || effectiveW < d || effectiveH < d || margin < 0) return result;

        double pitch = d + gap;
        PackContext context = new PackContext(effectiveW, effectiveH, pitch, margin, d);

        return PackInternal(context);
    }

    protected abstract List<Circle> PackInternal(PackContext data);
}