using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ritual_Services_Api.Models.Dto;
using Ritual_Services_Api.Models.Dto.ResultDto;
using Ritual_Services_Api.Models.Entities.Idemtity;
using Ritual_Services_Api.Models.Entities.Identity;

namespace Ritual_Services_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuneralOrderController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public FuneralOrderController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<FuneralOrderDto> GetFuneralOrders()
        {
            return _context.Wares.Select(f => new FuneralOrderDto
            {
                Id = f.Id,
                Price = f.Price
            }).ToList();
        }

        [HttpPost("Add")]
        public ResultDto Add(FuneralOrderDto dto)
        {
            try
            {
                FuneralOrder funOr = new FuneralOrder ()
                {
                    Price = dto.Price
                };
                _context.FuneralOrders.Add(funOr);
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


        [HttpDelete]
        public ResultDto Delete(int id)
        {
            try
            {
                if (id != null)
                {
                    var f = _context.FuneralOrders.Find(id);
                    _context.FuneralOrders.Remove(f);
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

        [HttpPost("Update")]
        public ResultDto Edit([FromBody] WareDto dto)
        {
            try
            {
                FuneralOrder w = _context.FuneralOrders.First(x => x.Id == dto.Id);
                w.Price = dto.Price;
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
