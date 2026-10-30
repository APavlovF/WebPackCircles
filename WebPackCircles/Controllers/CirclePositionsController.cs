using Microsoft.AspNetCore.Mvc;
using WebPackCircles.Models;
using WebPackCircles.Services;
using WebPackCircles.Work;

namespace WebPackCircles.Controllers;

[ApiController]
[Route("api/circlepositions")]
public class CirclePositionsController(ICalculateService calculateService) : ControllerBase
{
    [HttpPost]
    public ActionResult<PackResponse> Calculate([FromBody] SetupData request)
    {
        if (request == null || request.CircleSize <= 0)
        {
            return BadRequest("Invalid configuration parameters.");
        }

        List<Circle> rectangularCircles = calculateService.GetCircles(request, PackingStrategy.Rectangular);
        PackResult rectangular = calculateService.SheetPackData(rectangularCircles, request.Quantity);

        List<Circle> triangularCircles = calculateService.GetCircles(request, PackingStrategy.Triangular);
        PackResult triangular = calculateService.SheetPackData(triangularCircles, request.Quantity);

        rectangular.IsBestCut = rectangularCircles.Count > triangularCircles.Count;
        triangular.IsBestCut = !rectangular.IsBestCut;

        PackResponse response = new()
        {
            RectangularCircles = rectangularCircles,
            RectangularResult = rectangular,
            TriangularCircles = triangularCircles,
            TriangularResult = triangular
        };

        return Ok(response);
    }
}