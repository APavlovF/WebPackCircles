using WebPackCircles.Models;
using WebPackCircles.Work;

namespace WebPackCircles.Services;

public interface ICalculateService
{
    List<Circle> GetCircles(SetupData data, PackingStrategy strategy);
    PackResult SheetPackData(List<Circle> circles, int requiredQuantity);
}