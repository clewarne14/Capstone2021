package server.docker.docker;
import java.io.*;
import java.util.*;


public class Create{
    public static void main(String[] args){
        Scanner scan = new Scanner(System.in);
        String input = scan.next();
        scan.close();
        try{
            File execFile = new File("execFile.java");
            File testFile = new File("testFile.java");
            FileWriter execWriter = new FileWriter("execFile.java");
            execWriter.write(input);
            execWriter.close();
            System.out.println("DONE");
        } catch(IOException e){
            System.out.print("");
        }
    }
}