using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Ritual_Services_Api.Helpers;
using Ritual_Services_Api.Models.Dto;
using Ritual_Services_Api.Models.Dto.ResultDto;
using Ritual_Services_Api.Models.Entities.Identity;
using Ritual_Services_Api.Sevices.Interfaces;

namespace Ritual_Services_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationContext ctx;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IWebHostEnvironment _appEnvironment;
        private readonly IJwtTokenService _jwtTokenService;

        public AccountController(
                ApplicationContext context,
                UserManager<User> userManager,
                SignInManager<User> signInManager,
                IWebHostEnvironment appEnvironment,
                IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            ctx = context;
            _signInManager = signInManager;
            _appEnvironment = appEnvironment;
            _jwtTokenService = jwtTokenService;
        }

        [HttpGet("Profile")]
        public ResultDto GetUser( string id)
        {

            var user = ctx.UserAdditionalInfos.Select(c => new UserDto()
            {
                Id = c.Id,
                FullName = c.FullName,
                Phone = c.User.PhoneNumber,
                Email = c.User.Email,
                Age = c.Age,
                Image = c.Image
            }).FirstOrDefault(u=> u.Id == id);
            return new SingleResultDto<UserDto>
            {
                IsSuccessful = true,
                Data = user
            };
        }

        [HttpPost("Register")]
        public async Task<ResultDto> Register([FromForm(Name = "dto")] string args, [FromForm] IFormFile file)
        {
            var json = JObject.Parse(args);
            RegisterDto model = new RegisterDto
            {
                FullName = json.SelectToken("fullName").Value<string>(),
                Email = json.SelectToken("email").Value<string>(),
                Age = Int32.Parse(json.SelectToken("age").Value<string>()),
                Password = json.SelectToken("password").Value<string>(),
                PhoneNumber = json.SelectToken("phoneNumber").Value<string>()
            };

            try
            {
                User user = new User()
                {
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    UserName = model.Email
                };
                await _userManager.CreateAsync(user, model.Password);


                string fileName = Guid.NewGuid().ToString() + ".jpg";
                string path = _appEnvironment.WebRootPath + @"\Images";
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                path = path + @"\" + fileName;
                if (file == null)
                    return new ResultDto
                    {
                        IsSuccessful = false,
                        Message = "Error"
                    };
                if (file.Length == 0)
                    return new ResultDto
                    {
                        IsSuccessful = false,
                        Message = "Empty"
                    };
                try
                {
                    using (Bitmap bmp = new Bitmap(file.OpenReadStream()))
                    {
                        var saveImage = ImageWorker.CreateImage(bmp, 200, 125);
                        if (saveImage != null)
                        {
                            saveImage.Save(path, ImageFormat.Jpeg);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return new ResultDto
                    {
                        IsSuccessful = false,
                        Message = ex.Message
                    };
                }

                UserAdditionalInfo ui = new UserAdditionalInfo()
                {
                    Id = user.Id,
                    Age = model.Age,
                    FullName = model.FullName,
                    Image = fileName
                };

                var result = _userManager.AddToRoleAsync(user, "User").Result;

                await ctx.UserAdditionalInfos.AddAsync(ui);
                await ctx.SaveChangesAsync();

                return new ResultDto
            {
                IsSuccessful = true
                };
            }
            catch (Exception ex)
            {

                throw;
            }


        }

        [HttpPost("login")]
        public async Task<ResultDto> Login(LoginDto model)
        {
            var res = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (!res.Succeeded)
                return new ResultDto
                {
                    IsSuccessful = false
                };

            var user = await _userManager.FindByEmailAsync(model.Email);
            await _signInManager.SignInAsync(user, isPersistent: false);

            return new ResultLoginDto
            {
                IsSuccessful = true,
                Token = _jwtTokenService.CreateToken(user),
                Message = user.Id
            };
        }

        [HttpPost]
        [Route("Edit")]
        public ResultDto EditProfile([FromBody] UserDto dto)
        {
            try
            {
                var f = ctx.UserAdditionalInfos.Include(x=>x.User).First(x => x.Id == dto.Id);

                f.FullName = dto.FullName;
                f.Age = dto.Age;
                f.User.Email = dto.Email;
                f.User.PhoneNumber = dto.Phone;
                f.Image = dto.Image;
                ctx.SaveChanges();
                return new ResultDto
                {
                    IsSuccessful = true,
                    Message = "Successfully created"
                };
            }
            catch (Exception)
            {
                return new ResultDto
                {
                    IsSuccessful = false,
                    Message = "Something goes wrong!"
                };
                throw;
            }
        }

    }
}
