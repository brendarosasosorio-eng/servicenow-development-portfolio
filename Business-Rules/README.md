# Business Rule Examples

ServiceNow server-side JavaScript examples demonstrating different Business Rule execution types and common implementation patterns.

## Examples

- Before Business Rule
- After Business Rule
- Async Business Rule
- Preventing a database operation

## Concepts Demonstrated

- Server-side JavaScript
- current and previous
- Before execution
- After execution
- Async execution
- setAbortAction()
- GlideRecord
- gs.info()
- Database operations
- Conditional execution

## Business Rule Execution Types

### Before
Runs before the database operation is completed.

Useful when modifying values on the current record before it is saved.

### After
Runs after the database operation has completed.

Useful when an action needs to occur after the record has been saved, especially when working with related records.

### Async
Runs asynchronously after the database transaction.

Useful for processing that does not need to block the user's transaction.

### Display
Runs when a record is loaded for display.

It can be used to send server-side information to the client through g_scratchpad.

## Important Practice

Avoid using current.update() inside a Before Business Rule.

Changes made to current in a Before Business Rule are automatically included when ServiceNow saves the record. Calling current.update() can cause unnecessary database operations and may trigger recursive Business Rule execution.

---

All examples in this section have been recreated for portfolio and demonstration purposes and contain no customer-specific or confidential information.
