using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Ritual_Services_Api.Helpers;
using Ritual_Services_Api.Models.Dto;
using Ritual_Services_Api.Models.Dto.ResultDto;
using Ritual_Services_Api.Models.Entities;
using Ritual_Services_Api.Models.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Ritual_Services_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IWebHostEnvironment _appEnvironment;

        public EmployeesController(ApplicationContext context,
                IWebHostEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
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

        [HttpPost]
        [Route("Add")]
        public ResultDto AddEmployees([FromForm(Name = "dto")] string args, [FromForm] IFormFile file)
        {
            var json = JObject.Parse(args);
            EmployeesDto model = new EmployeesDto
            {
                FullName = json.SelectToken("fullName").Value<string>(),
                Position = json.SelectToken("position").Value<string>(),
                Phone = json.SelectToken("phone").Value<string>(),
                Description = json.SelectToken("description").Value<string>()
            };

            try
            {
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
                    Employees newEmp = new Employees()
                    {
                        FullName = model.FullName,
                        Position = model.Position,
                        Phone = model.Phone,
                        Image = fileName,
                        Description = model.Description
                    };



                    _context.Employees.Add(newEmp);
                    _context.SaveChanges();
                    return new ResultDto
                    {
                        IsSuccessful = true,
                        Message = "Sucessfuly add"
                    };
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
