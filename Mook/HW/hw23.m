clc;clear;close all;


syms  k1 k2 m1 J R D c m2 s k3

A = [0 1 0 0 0 0 0; -k1/m1 0 0 0 0 0 0; 0 0 0 1 0 0 0 ;
    0 0 ((-R.^2/J)*(k2+k1)) 0 ((R*k2)/J)  0 0 ;
    0 0 0 0 0 0 1/D;0, 0, 0, 0, 0, (-1/(c*R)), (1/c);
0, 0, (R*k2)/(c*D-m2/D), 0, 0, (1/(1-(m2/(c*D.^2)))), (-R/(1-(m1/(c*D.^2))))+(k2+k3)/(c-m2) + (1/D)/(D-m1/(c*D)) ];

B = [1 0 0 0 0 0 0 ]';
C = [0 0 0 0 0 1/R -1];
Dmat = [0];

CE = charpoly(A);
CE = pretty(CE);
calInverse = inv(s*eye(7)-A);
TFM =( C * calInverse* B) + Dmat;
