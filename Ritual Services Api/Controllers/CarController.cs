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
    public class CarController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public CarController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public CollectionResultDto<CarDto> GetCars()
        {
            var cars = _context.Cars.Select(c => new CarDto()
            {
                Id = c.Id,
                Brand = c.Brand,
                Marks = c.Marks
            }).ToList();

            return new CollectionResultDto<CarDto>
            {
                IsSuccessful = true
                //Data =
            };
        }

        [HttpDelete]
        public ResultDto DleteCar(int id)
        {
            try
            {
                if (id != null)
                {
                    var c = _context.Cars.Find(id);
                    _context.Cars.Remove(c);
                    _context.SaveChanges();
                    return new ResultDto
                    {
                        IsSuccessful = true,
                        Message = "Sucessfuly deleted"
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

        [HttpPost]
        [Route("Add")]
        public ResultDto AddCategory([FromBody] CarDto dto)
        {
            try
            {
                if(dto!=null)
                {
                    Car newCar = new Car()
                    {
                        Marks = dto.Marks,
                        Brand = dto.Brand
                    };
                    _context.Cars.Add(newCar);
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

        [HttpPost]
        [Route("Update")]
        public ResultDto UpdateCar([FromBody] CarDto dto)
        {
            try
            {
                Car f = _context.Cars.First(x => x.Id == dto.Id);

                f.Brand = dto.Brand;
                f.Marks = dto.Marks;
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