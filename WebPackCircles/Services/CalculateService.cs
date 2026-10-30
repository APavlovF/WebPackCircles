using WebPackCircles.Models;
using WebPackCircles.Work;

namespace WebPackCircles.Services;

public class CalculateService(IServiceProvider serviceProvider) : ICalculateService
{
    public List<Circle> GetCircles(SetupData data, PackingStrategy strategy)
    {
        double width = data.SheetWidth;
        double height = data.SheetHeight;
        double diameter = data.CircleSize;
        double gap = data.Space;
        double margin = data.SheetMargin;

        return GetPacker(strategy).Pack(width, height, diameter, gap, margin);
    }

    public PackResult SheetPackData(List<Circle> circles, int requiredQuantity)
    {
        int sheetsNeeded = (int)Math.Ceiling((double)requiredQuantity / circles.Count);
        int lastSheetQuantity = requiredQuantity - (sheetsNeeded - 1) * circles.Count;
        double fillPercentage = circles.Count != 0 ? (double)lastSheetQuantity / circles.Count : 0;
        for (int i = 0; i < lastSheetQuantity; i++)
        {
            circles[i].IsFilled = true;
        }

        PackResult result = new()
        {
            FillPercentage = Math.Round(fillPercentage * 100, 2),
            LastSheetCircles = lastSheetQuantity,
            QuantityPerSheet = circles.Count,
            SheetsNeeded = sheetsNeeded
        };

        return result;
    }

    CirclePacker GetPacker(PackingStrategy strategy)
    {
        return serviceProvider.GetRequiredKeyedService<CirclePacker>(strategy);
    }
}