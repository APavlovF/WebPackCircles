using WebPackCircles.Models;
using WebPackCircles.Work;

namespace WebPackCircles.Services;

public class CalculateService(IServiceProvider serviceProvider) : ICalculateService
{
    public List<Circle> GetCircles(SetupData data, PackingStrategy strategy) => GetPacker(strategy)
        .Pack(data.SheetWidth, data.SheetHeight, data.CircleSize, data.Space, data.SheetMargin);

    public PackResult SheetPackData(List<Circle> circles, int requiredQuantity)
    {
        int circlesCount = circles.Count;
        int sheetsNeeded = circlesCount > 0 ? (int)Math.Ceiling((double)requiredQuantity / circlesCount) : 0;
        int lastSheetQuantity = circlesCount > 0 ? requiredQuantity - (sheetsNeeded - 1) * circlesCount : 0;
        double fillPercentage = circlesCount != 0 ? (double)lastSheetQuantity / circlesCount : 0;
        for (int i = 0; i < lastSheetQuantity; i++)
        {
            circles[i].IsFilled = true;
        }

        PackResult result = new()
        {
            FillPercentage = Math.Round(fillPercentage * 100, 2),
            LastSheetCircles = lastSheetQuantity,
            QuantityPerSheet = circlesCount,
            SheetsNeeded = sheetsNeeded
        };

        return result;
    }

    CirclePacker GetPacker(PackingStrategy strategy) => serviceProvider.GetRequiredKeyedService<CirclePacker>(strategy);
}