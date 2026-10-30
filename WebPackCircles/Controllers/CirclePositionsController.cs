using Microsoft.AspNetCore.Mvc;
using WebPackCircles.Models;
using WebPackCircles.Services;

namespace WebPackCircles.Controllers;

[ApiController]
[Route("api/circlepositions")]
public class CirclePositionsController(ResponseService responseService) : ControllerBase
{
    [HttpPost]
    public ActionResult<PackResponse> Calculate([FromBody] SetupData request) =>
        request == null || request.CircleSize <= 0
            ? BadRequest("Invalid configuration parameters.")
            : Ok(responseService.GetResponse(request));
}