package org.springframework.samples.petclinic;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Slf4j
@Configuration
@Profile("dev")
public class DevConfiguration extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        log.debug("Using client resources from client dir");

        super.addResourceHandlers(registry);

        String path = System.getProperty("user.dir") + "/../client/build/";

        registry.addResourceHandler("/**")
            .addResourceLocations("file:///" + path)
            .setCacheControl(CacheControl.noCache());

        registry.addResourceHandler("swagger-ui.html")
            .addResourceLocations("classpath:/META-INF/resources/")
            .setCacheControl(CacheControl.noCache());
    }
}
