## Remote Call Procedures
Also known as RPC, this is a common pattern, but it is often criticized. The main problem is that sometimes the developer doesn't know whether a function call is local or a slow RPC on another side, adding complexity to the debugging process.

To successfully implement RPC, we should:

- Clearly indicate when a function is an RPC.
- Document the RPC functions.
- Handle server errors, such as when the server is down.

### Message Properties
- persistent: If true, the message is persistent; if not, the message is transient.
- content_type: Describes the MIME type of the encoding.
- reply_to: Commonly used to name a callback queue.
- correlation_id: Used to correlate a remote call procedure with a request.

### Correlation ID
We use a unique ID for every request. Later, when we receive a message in the callback, we validate this property before running the callback.
