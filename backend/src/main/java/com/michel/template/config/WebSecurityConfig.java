package com.michel.template.config;

import com.michel.template.auth.CustomAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomAuthenticationProvider authProvider;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .configurationSource(request -> {
                    final CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOriginPatterns(List.of("*"));
                    config.setAllowedMethods(Arrays.asList("POST", "PUT", "DELETE", "GET"));
                    config.setAllowCredentials(true);
                    config.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));

                    return config;
                })
            .and()
            .authenticationProvider(authProvider)
                .authorizeRequests()
                .antMatchers("/user/login").permitAll()
                .antMatchers("/user/create").permitAll()
                .antMatchers("/user/recoverPassword").permitAll()
                .antMatchers("/user/validateRecoverCode").permitAll()
                .antMatchers("/user/changeRecoveredPassword").permitAll()
                .antMatchers("/ping").permitAll()
                .antMatchers("/invite/validate").permitAll()
                .antMatchers("/invite/confirmCode").permitAll()
                .anyRequest().authenticated()
            .and()
                .httpBasic()
            .and()
                .csrf().disable()
                .headers().frameOptions().disable();
    }
}