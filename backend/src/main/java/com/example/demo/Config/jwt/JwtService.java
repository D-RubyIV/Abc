package com.example.demo.Config.jwt;

import com.example.demo.Domain.UserDomain;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.security.*;
import java.util.Date;

@Service
@Component
public class JwtService {
    private static final String SECRET_KEY = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    private static final int EXPIRED_TIME_SHORT = 3600 * 1000;
    private static final int EXPIRED_TIME_LONG = 3600 * 24 * 1000;

    public String createAccessToken(UserDomain userEntity){
        return createToken(userEntity, ExpiredType.SHORT);
    }
    public String creatRefreshToken(UserDomain userEntity){
        return createToken(userEntity, ExpiredType.LONG);
    }
    public String createToken(UserDomain userEntity, ExpiredType type){
        int EXPIRED_TIME = (type == ExpiredType.SHORT) ? EXPIRED_TIME_SHORT : EXPIRED_TIME_LONG;
        return Jwts.builder()
                .setSubject(userEntity.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRED_TIME))
                .signWith(getSignInKey())
                .compact();
    }
    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
    }
    public Boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token);
            return true;
        }catch (Exception e){
            System.out.printf("JWT Error -> Message: %s ", e.getMessage());
        }
        return false;
    }
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    public Date extractExpiration(String token) {
        return parseClaims(token).getExpiration();
    }
    public Date getExpired(String token) {
        return parseClaims(token).getExpiration();
    }
    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }
    public Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
