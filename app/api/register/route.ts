import  bcrypt  from 'bcrypt';
import prisma from '../../../libs/prismadb';
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
   try {
       const body = await req.json();
       const { name , email, password } = body;

       // Validate request body
       if (!email || !password) {
           throw new Error("Email and password are required.");
       }

       // Check if user exists in the database
       const hashedPassword = await bcrypt.hash(password, 10);

       // Create user in the database
       const user = await prisma.user.create({
           data: {
               name,
               email,
               hashedPassword
           }
       });

       // Assuming the user exists and login is successful
       return NextResponse.json({ success: true, user });
   } catch (error:any) {
       // Handle errors
       console.error("Error during login:", error);
       // Return appropriate error response
       return NextResponse.error();
   }
};
