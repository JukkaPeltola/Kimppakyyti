﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;

namespace KimppakyytiApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DocumentClient _client;
        private const string _dbName = "UserDB";
        private const string _collectionName = "User";

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
            var endpointUri =
            _configuration["ConnectionStrings:CosmosDBConnection:EndpointUri"];
            var key =
            _configuration["ConnectionStrings:CosmosDBConnection:PrimaryKey"];
            _client = new DocumentClient(new Uri(endpointUri), key);
            _client.CreateDatabaseIfNotExistsAsync(new Database
            {
                Id = _dbName
            }).Wait();
            
            _client.CreateDocumentCollectionIfNotExistsAsync(
            UriFactory.CreateDatabaseUri(_dbName),
            new DocumentCollection { Id = _collectionName });
        }

        [HttpGet]
        public string Ping()
        {
            return "Nyt on tehty collection, vaikka sitä ei oltu tehty aiemmin!";
        }
        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] KimppakyytiApi.Models.User value)
        {
            Document document = await _client.CreateDocumentAsync(
          UriFactory.CreateDocumentCollectionUri(_dbName, _collectionName),
          value);
            return Ok(document.Id);
        }
        
    }
}