using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ritual_Services_Api.Models.Dto;
using Ritual_Services_Api.Models.Dto.ResultDto;
using Ritual_Services_Api.Models.Entities;
using Ritual_Services_Api.Models.Entities.Identity;

namespace Ritual_Services_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceCemeteryController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public PlaceCemeteryController(ApplicationContext context)
        {
            _context = context;
        }

        public CollectionResultDto<PlaceCemetaryDto> GetPlaceCemetary()
        {
            var place = _context.PlaceCemetaries.Select(c => new PlaceCemetaryDto()
            {
                Id = c.Id,
                Dsitrict = c.Dsitrict,
                Place = c.Place,
                Prise = c.Prise
            }).ToList();
            return new CollectionResultDto<PlaceCemetaryDto>
            {
                IsSuccessful = true,
                Data = place
            };
        }


        [HttpDelete]
        public ResultDto DeletePlaceCemetary(int id)
        {
            try
            {
                if (id != null)
                {
                    var c = _context.PlaceCemetaries.Find(id);
                    _context.PlaceCemetaries.Remove(c);
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
        public ResultDto AddPlaceCemetary([FromBody] PlaceCemetaryDto dto)
        {
            try
            {
                if (dto != null)
                {
                    PlaceCemetary newC = new PlaceCemetary()
                    {
                        Dsitrict = dto.Dsitrict,
                        Place = dto.Place,
                        Prise = dto.Prise
                    };
                    _context.PlaceCemetaries.Add(newC);
                    _context.SaveChanges();
                    return new ResultDto
                    {
                        IsSuccessful = false,
                        Message = "Successfully added"
                    };
                }
                else
                {
                    return new ResultDto
                    {
                        IsSuccessful = false,
                        Message = "Null"
                    };
                }
            }
            catch (Exception)
            {
                return new ResultDto
                {
                    IsSuccessful = false,
                    Message = "Error"
                };
                throw;
            }
        }
        [HttpPost]
        [Route("Update")]
        public ResultDto UpdatePlaceCemetary([FromBody] PlaceCemetaryDto dto)
        {
            try
            {
                PlaceCemetary f = _context.PlaceCemetaries.First(x => x.Id == dto.Id);

                f.Dsitrict = dto.Dsitrict;
                f.Place = dto.Place;
                f.Prise = dto.Prise;
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
