using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ritual_Services_Api.Models.Dto;
using Ritual_Services_Api.Models.Dto.ResultDto;
using Ritual_Services_Api.Models.Entities;
using Ritual_Services_Api.Models.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public EmployeesController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public CollectionResultDto<EmployeesDto>GetEmloyees()
        {
            var employeeses = _context.Employees.Select(e => new EmployeesDto()
            {
                Id=e.Id,
                FullName=e.FullName,
                Position=e.Position,
                Phone= e.Phone,
                Image=e.Image,
                Description=e.Description
            }).ToList();
            return new CollectionResultDto<EmployeesDto>
            {
                IsSuccessful = true,
                Data = employeeses
            };
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public ResultDto DeleteEmployees(int id)
        {
            try
            {
                if (id != null)
                {
                    var e = _context.Employees.Find(id);
                    _context.Employees.Remove(e);
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
        [HttpPost]
        [Route("Add")]
        public ResultDto AddEmployees([FromBody]EmployeesDto dto)
        {
            try
            {
                if(dto!=null)
                {
                    Employees newEmp = new Employees()
                    {
                        FullName = dto.FullName,
                        Position = dto.Position,
                        Phone = dto.Phone,
                        Image = dto.Image,
                        Description = dto.Description
                    };
                    _context.Employees.Add(newEmp);
                    _context.SaveChanges();
                    return new ResultDto
                    {
                        IsSuccessful = true,
                        Message = "Sucessfuly add"
                    };

                }
                else
                {
                    return new ResultDto
                    {
                        IsSuccessful = false,
                        Message = "Model is null"
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
        [HttpPost]
        [Route("Update")]
        public ResultDto UpdateEmployees([FromBody] EmployeesDto dto)
        {
            try
            {
                Employees f = _context.Employees.First(x => x.Id == dto.Id);

                f.FullName = dto.FullName;
                f.Position = dto.Position;
                f.Phone = dto.Phone;
                f.Image = dto.Image;
                f.Description = dto.Description;
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
