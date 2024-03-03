
import * as bcrypt from "bcrypt"
import hashManager from "../../services/hashManager"
const pass = "123456"


describe("it should create a hash from a password, and compare se os hashes are equals",()=>{
    it("should generate hash a generate a hash",async()=>{
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const result = await bcrypt.hash(pass, salt)

        expect(result).toBeDefined
        expect(result.length).toBeGreaterThan(10)
    })

     it("should compare a hash",async()=>{
        const hash = await hashManager.generateHash(pass)
        const result = await bcrypt.compare(pass,hash)        
        expect(result).toBeTruthy()        
    })
   
})