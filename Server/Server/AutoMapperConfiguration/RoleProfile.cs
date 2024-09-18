using AutoMapper;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.AutoMapperConfiguration
{
	public class RoleProfile : Profile
	{
		public RoleProfile()
		{
			ConfigureModelToDtoMappings();
			ConfigureDtoToModelMappings();
		}

		private void ConfigureModelToDtoMappings()
		{
			CreateMap<Role, RoleDTO>();
		}

		private void ConfigureDtoToModelMappings()
		{
			CreateMap<RoleDTO, Role>();
		}
	}
}
