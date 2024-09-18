using AutoMapper;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Punchcard.Core.Server.AutoMapperConfiguration
{
	public class PermissionProfile : Profile
	{
		public PermissionProfile()
		{
			ConfigureModelToDtoMappings();
			ConfigureDtoToModelMappings();
		}

		private void ConfigureModelToDtoMappings()
		{
			CreateMap<Permission, PermissionDTO>();
		}

		private void ConfigureDtoToModelMappings()
		{
			CreateMap<PermissionDTO, Permission>();
		}
	}
}
