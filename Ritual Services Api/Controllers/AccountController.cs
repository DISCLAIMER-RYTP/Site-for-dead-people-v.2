using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly IJwtTokenService _jwtTokenService;

        public AccountController(
                ApplicationContext context,
                UserManager<User> userManager,
                SignInManager<User> signInManager,
                IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            ctx = context;
            _signInManager = signInManager;
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
        public async Task<ResultDto> Register([FromBody] RegisterDto model)
        {
            try
            {
                User user = new User()
                {
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    UserName = model.Email
                };
                await _userManager.CreateAsync(user, model.Password);
                UserAdditionalInfo ui = new UserAdditionalInfo()
                {
                    Id = user.Id,
                    Age = model.Age,
                    FullName = model.FullName,
                    Image = model.Image
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
