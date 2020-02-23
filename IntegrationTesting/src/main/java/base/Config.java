package main.java.base;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public final class Config {

	// static variable single_instance of type Singleton 
    private static Config single_instance = null; 
  
    // variable of type String 
    private static JSONObject data; 
    
    // private constructor restricted to this class itself 
    private Config() 
    { 
    	String resourceName = "/config.json";
        JSONParser parser = new JSONParser();
    	try {
			data = (JSONObject) parser.parse(new FileReader(Config.class.getResource(resourceName).getPath()));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    
    } 
    
    public static synchronized String getValue(String property) {
    	return (String) data.get(property);
    }
    
    // static method to create instance of Singleton class 
    public static synchronized Config getInstance() 
    { 
        if (single_instance == null) 
            single_instance = new Config(); 
  
        return single_instance; 
    } 

}
