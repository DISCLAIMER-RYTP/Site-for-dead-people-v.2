using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ritual_Services_Api.Models.Dto;
using Ritual_Services_Api.Models.Dto.ResultDto;
using Ritual_Services_Api.Models.Entities;
using Ritual_Services_Api.Models.Entities.Identity;

namespace Ritual_Services_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WareController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public WareController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet("{category}")]
        
        public ResultDto GetWares([FromRoute]string category)
        {

            return new CollectionResultDto<WareDto>
            {
                Data = _context.Wares.Include(x => x.Category).Select(w => new WareDto
                {
                    Id = w.Id,
                    Name = w.Name,
                    Image = w.Image,
                    Price = w.Price,
                    Description = w.Description,
                    CategoryName = w.Category.Name
                }).Where(w => w.CategoryName == category).ToList(),
                IsSuccessful = true
            };
        }

        [HttpGet("getCategory")]
        public ResultDto GetCategories()
        {
            var r = _context.Categories.Select(x => new CategoryDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToList();
            return new CollectionResultDto<CategoryDto>
            {

                Data = r, IsSuccessful=true

            };
        }

        




        [HttpPost("Add")]
        public ResultDto Add(WareDto dto)
        {
            try
            {
                Ware ware = new Ware()
                {
                    Name = dto.Name,
                    Image = dto.Image,
                    Price = dto.Price,
                    Description = dto.Description,
                    Category = _context.Categories.FirstOrDefault(x=>x.Name==dto.CategoryName)
                };
                _context.Wares.Add(ware);
                _context.SaveChangesAsync();
                return new ResultDto
                {
                    IsSuccessful = true,
                    Message = "Succesfully created"
                };
            }
            catch (Exception ex)
            {
                return new ResultDto
                {
                    IsSuccessful = false,
                    Message = "Error"
                };
            }
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public ResultDto Delete(int id)
        {
            try
            {
                if (id != null)
                {
                    var w = _context.Wares.Find(id);
                    _context.Wares.Remove(w);
                    _context.SaveChanges();
                    return new ResultDto
                    {
                        IsSuccessful = true,
                        Message = "Successfully deleted"
                    };
                }
                else
                {
                    return new ResultDto
                    {
                        IsSuccessful = false,
                        Message = "Id is not defined"
                    };
                }
            }
            catch (Exception)
            {
                return new ResultDto
                {
                    IsSuccessful = false,
                    Message = "Something goes wrong"
                };
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Update")]
        
        public ResultDto Edit([FromBody] WareDto dto)
        {
            try
            {
                Ware w = _context.Wares.First(x => x.Id == dto.Id);
                w.Name = dto.Name;
                w.Image = dto.Image;
                w.Price = dto.Price;
                w.Description = dto.Description;
                _context.SaveChanges();
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
