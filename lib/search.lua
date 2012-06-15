local TOKEN_PREFIX = 'T:'
local SEARCH_PREFIX = 'S:'
local ACTIVETOKEN_PREFIX = 'AT:'
local tokens = cjson.decode(ARGV[1])
local tokenCount = table.getn(tokens)
local searchKey = table.concat(tokens, '&&')
local arguments = {};
for i = 1, tokenCount do
    redis.call('SADD', "AS:" .. tokens[i], searchKey);
    table.insert(arguments, TOKEN_PREFIX .. tokens[i])
end
table.insert(arguments, 'AGGREGATE')
table.insert(arguments, 'MIN')
redis.call('ZINTERSTORE', searchKey, tokenCount, unpack(arguments))
return redis.call('ZREVRANGE', searchKey, 0, -1)