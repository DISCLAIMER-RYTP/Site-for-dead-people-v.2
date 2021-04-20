﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost("register")]
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
                return new ResultDto
                {
                    IsSuccessful = false,
                    Message = ex.Message
                };
                throw;
            }


        }

        [HttpPost("login")]
        public async Task<ResultDto> Login(LoginDto model)
        {
            var res = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            var id = ctx.Users.Where(x => x.Email == model.Email).FirstOrDefault();
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
                    Message = id.Id
            };
        }


        [HttpGet]
        [Route("{id}")]
        public ResultDto GetUser([FromRoute] string id)
        {
            var user = ctx.Users.Find(id);
            var userA = ctx.UserAdditionalInfos.Find(id);
            EditDto res = new EditDto()
            {
                Id = userA.Id,
                FullName = userA.FullName,
                Age = userA.Age,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Image = userA.Image
            };

            return new SingleResultDto<EditDto>
            {
                IsSuccessful = true,
                Data = res
            };
        }

        [HttpPost("edit")]
        public ResultDto EditUser(EditDto model)
        {
            var user = ctx.Users.Find(model.Id);
            var userA = ctx.UserAdditionalInfos.Find(model.Id);

            userA.FullName = model.FullName;
            userA.Age = model.Age;
            userA.Image = model.Image;
            user.PhoneNumber = model.PhoneNumber;
            user.Email = model.Email;

            ctx.SaveChanges();

            return new ResultDto
            {
                IsSuccessful = true
            };
        }

    }
}
