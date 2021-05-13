using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ritual_Services_Api.Models.Dto;
using Ritual_Services_Api.Models.Dto.ResultDto;
using Ritual_Services_Api.Models.Entities;
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
            return _context.FuneralOrders.Select(f => new FuneralOrderDto
            {
                Id = f.Id,
                Price = f.Price
            }).ToList();
        }

        [Authorize(Roles = "User")]
        [HttpPost("Add")]
        public ResultDto Add(FuneralOrderDto dto)
        {
            try
            {
                FuneralOrder funOr = new FuneralOrder ()
                {
                    Price = dto.Price,
                    User = _context.Users.FirstOrDefault(u => u.Id == dto.UserId),
                    Category = _context.CategoryOrders.FirstOrDefault(c=> c.Name == dto.CategoryName)
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


        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
        [HttpPost("Update")]
        public ResultDto Edit([FromBody] FuneralOrderDto dto)
        {
            try
            {
                FuneralOrder w = _context.FuneralOrders.First(x => x.Id == dto.Id);
                w.Price = dto.Price;
                w.Category = _context.CategoryOrders.FirstOrDefault(c => c.Name == dto.CategoryName);
                w.User = _context.Users.FirstOrDefault(u => u.Id == dto.UserId);
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

        [Authorize(Roles = "User")]
        [HttpPost("Send")]
        public ResultDto SendRequest(int id)
        {
            try
            {
                RequestOrder funOr = new RequestOrder()
                {
                    Requests = Req.Requested,
                    Order = _context.FuneralOrders.FirstOrDefault(f=>f.Id == id)
                };
                _context.RequestOrders.Add(funOr);
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

        [Authorize(Roles = "Admin")]
        [HttpPost("accept")]
        public ResultDto AcceptRequest(int id)
        {
            try
            {
                var r = _context.RequestOrders.FirstOrDefault(o => o.Id == id);
                r.Requests = Req.Accepted;
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

        [Authorize(Roles = "Admin")]
        [HttpPost("reject")]
        public ResultDto RejectRequest(int id)
        {
            try
            {
                var r = _context.RequestOrders.FirstOrDefault(o => o.Id == id);
                r.Requests = Req.Rejected;
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
