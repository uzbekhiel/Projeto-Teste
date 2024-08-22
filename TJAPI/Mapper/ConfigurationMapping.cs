using AutoMapper;
using TJAPI.Dto;
using TJAPI.Entities;

namespace TJAPI.Mapper
{
    public class ConfigurationMapping : Profile
    {
        public ConfigurationMapping()
        {
            CreateMap<User, UserResult>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ID_USU))
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.NOME_USU))
                .ForMember(dest => dest.Origem, opt => opt.MapFrom(src => src.UserType.DESCR))
                .ForMember(dest => dest.DataNascimento, opt => opt.MapFrom(src => src.DATA_NASC))
                .ForMember(dest => dest.Matricula, opt => opt.MapFrom(src => src.MATR_USU));

            CreateMap<UserCommand, User>()
                .ForMember(dest => dest.ID_USU, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.NOME_USU, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.ID_TIPOUSUARIO, opt => opt.MapFrom(src => src.User_Type))
                .ForMember(dest => dest.ORIGEM, opt => opt.MapFrom(src => src.Origem))
                .ForMember(dest => dest.DATA_NASC, opt => opt.MapFrom(src => src.DataNascimento))
                .ForMember(dest => dest.MATR_USU, opt => opt.MapFrom(src => src.Matricula));

            CreateMap<UserType, UserTypeResult>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ID_TIPOUSUARIO))
                .ForMember(dest => dest.Sigla, opt => opt.MapFrom(src => src.ORIGEM))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.DESCR));

        }
    }
}
