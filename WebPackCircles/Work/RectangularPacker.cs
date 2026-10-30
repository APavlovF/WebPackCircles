using WebPackCircles.Models;

namespace WebPackCircles.Work;

public class RectangularPacker : CirclePacker
{
    protected override List<Circle> PackInternal(PackContext data)
    {
        List<Circle> result = [];
        int cols = (int)Math.Floor((data.EffectiveW - data.CircleSize) / data.Pitch + Eps) + 1;
        int rows = (int)Math.Floor((data.EffectiveH - data.CircleSize) / data.Pitch + Eps) + 1;
        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                result.Add(new Circle(data.CircleSize, data.SheetMargin + c * data.Pitch,
                    data.SheetMargin + r * data.Pitch));
            }
        }
        return result;
    }
}