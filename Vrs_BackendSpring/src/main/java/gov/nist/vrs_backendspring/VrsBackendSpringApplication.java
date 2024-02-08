package gov.nist.vrs_backendspring;

import gov.nist.vrs_backendspring.Parser.XMLParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class VrsBackendSpringApplication {

    @Autowired
    private static XMLParser xmlParser;

    public static void main(String[] args) {
        SpringApplication.run(VrsBackendSpringApplication.class, args);
//        System.out.println("Hello World!");
//        xmlParser.run();
        System.out.println("Spring Done");


    }

}
