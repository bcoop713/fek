# Utility

## Lists

head :: List a -> Maybe a
tail :: List a -> List a
find :: P -> List a -> Maybe a

## Objects

get :: String -> a -> Maybe b
get$ :: String -> a -> b & throws
set :: String -> a -> b -> c
update :: (Maybe c -> d) -> a -> b
update$ :: (c -> d) -> a -> b

## Functions

map
reduce
filter
pipe
cond


## Maybe

map
chain
collect

## Result

collect gather all errors, or return last ok
shortCircut :: collectOk until error, then returns Result type
map
chain
fromPromise?


