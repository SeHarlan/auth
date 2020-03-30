# Auth

* lab
* 3 parts
  * identification
  * session
  * interaction
* architecture
  * signin, login routes (interaction from identification to session)
  * verify route (interaction to check session)
  * ensureAuth middleware (interaction to check session)
  * hash password with bcrypt with virtual (identification)
  * check email and password with bcrypt, authenticate instance method (identification)
  * create auth token with jwt (session)
  * findByToken static method
* bcrypt experimentation
  * parts of hash (version, salt, hash)
  * why?
    * clear password text (anyone can steal)
    * basic hash without salt (rainbow table)
    * hash with salt (rainbow table once hash stolen, create user all users with same hash have same password)
    * hash with random salt (brute force)
    * slower is better
* jwt experimentation
* steps
  [x] hash password with virtual (in User model)
  [x] create auth token with jwt (in User model)
  [] signup route (in auth routes)
  [] authorize method (in User model)
  [] login route (in auth routes)
  [] findByToken method (in User model)
  [] ensureAuth middleware (cookie-parser) (in ensure-auth middleware)
  [] verify route (in auth routes)
