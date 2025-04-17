using Application.DTOs;
using Application.Interfaces;
using AutoMapper;

namespace Application.UseCases
{
    public class GetByIdUseCase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public GetByIdUseCase(IProductRepository repository, IMapper mapper)
        {
            _productRepository = repository;
            _mapper = mapper;
        }

        public async Task<ProductDTO> GetById(int id){
            var product = await _productRepository.GetProductById(id);
            return _mapper.Map<ProductDTO>(product);
        }
    }
}