using WebPackCircles.Models;
using WebPackCircles.Work;

namespace WebPackCircles.Services;

public class ResponseService(ICalculateService calculateService)
{
    public PackResponse GetResponse(SetupData data)
    {
        List<Circle> rectangularCircles = calculateService.GetCircles(data, PackingStrategy.Rectangular);
        PackResult rectangular = calculateService.SheetPackData(rectangularCircles, data.Quantity);

        List<Circle> triangularCircles = calculateService.GetCircles(data, PackingStrategy.Triangular);
        PackResult triangular = calculateService.SheetPackData(triangularCircles, data.Quantity);

        rectangular.IsBestCut = rectangularCircles.Count > triangularCircles.Count;
        triangular.IsBestCut = !rectangular.IsBestCut;

        return new()
        {
            RectangularCircles = rectangularCircles,
            RectangularResult = rectangular,
            TriangularCircles = triangularCircles,
            TriangularResult = triangular
        };
    }
}