using WebPackCircles.Models;

namespace WebPackCircles.Work;

public class TriangularPacker : CirclePacker
{
    protected override List<Circle> PackInternal(PackContext data)
    {
        List<Circle> result = [];
        double rowStep = data.Pitch * Math.Sqrt(3) / 2;
        int rows = (int)Math.Floor((data.EffectiveH - data.CircleSize) / rowStep + Eps) + 1;

        for (int r = 0; r < rows; r++)
        {
            double rowOffset = r % 2 == 1 ? data.Pitch / 2 : 0;
            double available = data.EffectiveW - data.CircleSize - rowOffset;
            if (available < -Eps) continue;

            int cols = (int)Math.Floor(available / data.Pitch + Eps) + 1;
            for (int c = 0; c < cols; c++)
            {
                double x = data.SheetMargin + rowOffset + c * data.Pitch;
                double y = data.SheetMargin + r * rowStep;
                result.Add(new Circle(data.CircleSize, x, y));
            }
        }

        return result;
    }
}