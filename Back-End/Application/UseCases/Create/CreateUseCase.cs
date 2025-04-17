using Application.Interfaces;
using Domain.Entities;
using Application.DTOs;
using AutoMapper;

namespace Application.UseCases
{
    public class CreateUseCase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

       public CreateUseCase(IProductRepository repository, IMapper mapper)
        {
            _productRepository = repository;
            _mapper = mapper;
        }

        public async Task Create(CreateProductDTO createProductDTO)
        {
            var product = _mapper.Map<Product>(createProductDTO);
            await _productRepository.Create(product);
        }

    }
}