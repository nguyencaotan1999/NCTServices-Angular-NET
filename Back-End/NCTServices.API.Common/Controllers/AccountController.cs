using Microsoft.AspNetCore.Mvc;
using NCTServices.Application.Common.Services.Account.Command;
using NCTServices.Application.Common.Services.Login;
using NCTServices.Application.Common.Services.OrderDetail.Queries;
using NCTServices.Domain.Entity;
using NCTServices.Model.Requests;
using System.Text;

namespace NCTServices.API.Common.Controllers
{
    public class AccountController : BaseApiController<AccountController>
    {
        [HttpGet]
        [Route("Login")]
        public async Task<IActionResult> GetUser(string username, string password)
        {
            try
            {
                if (username == null || password == null)
                {
                    return BadRequest("User Name or Password is not null");
                }
                var Encode = PasswordEncode(password);
                UserRequest request = new UserRequest();
                request.UserName = username;
                request.Password = Encode;
                var listProducts = await _mediator.Send(new GetUserQueries(request));
               
                return Ok(listProducts);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> RegisterAccount([FromBody] RegisterAccoutnRequest request  )
        {
            try
            {
                if (!string.IsNullOrEmpty(request.Email) & !string.IsNullOrEmpty(request.Password)) {
                    var Encode = PasswordEncode(request.Password);
                    request.Password = Encode;

                    var listProducts = await _mediator.Send(new RegisterAccountCommand(request));
                    return Ok(listProducts.Succeeded);
                }
                return BadRequest();

               
            }
            catch (Exception)
            {

                throw;
            }
        }


        private string PasswordDecode(string Password)
        {
            var base64EncodedBytes = Convert.FromBase64String(Password);
            return Encoding.UTF8.GetString(base64EncodedBytes);

        }
        private string PasswordEncode(string Password)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(Password); 
            return Convert.ToBase64String(plainTextBytes);
        }

    }
}
